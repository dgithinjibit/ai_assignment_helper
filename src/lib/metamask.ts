import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

export const connectMetaMask = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (accounts.length === 0) {
      throw new Error('No accounts found. Please connect your MetaMask wallet.');
    }

    return accounts[0];
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Please connect your MetaMask wallet to continue.');
    }
    throw new Error('Failed to connect to MetaMask: ' + error.message);
  }
};

export const getMetaMaskAccount = async (): Promise<string | null> => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error getting MetaMask account:', error);
    return null;
  }
};

export const switchToEthereumMainnet = async (): Promise<void> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }], // Ethereum Mainnet
    });
  } catch (error: any) {
    if (error.code === 4902) {
      // Chain not added to MetaMask
      throw new Error('Please add Ethereum Mainnet to your MetaMask wallet.');
    }
    throw error;
  }
};

export const getWalletBalance = async (address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return '0';
  }
};

export const signMessage = async (message: string, address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });

    return signature;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Message signing was cancelled.');
    }
    throw new Error('Failed to sign message: ' + error.message);
  }
};