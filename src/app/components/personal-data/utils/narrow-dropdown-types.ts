import { ListDropdown } from '../../../shared/components/dropdown/types/interface/listDropdown';

export function isString(obj: string | ListDropdown): obj is string {
  return typeof obj === 'string';
}
