import { getAccountBalance } from '../utils/contract-utils';

let balance = await getAccountBalance(window.localStorage.getItem('address'));