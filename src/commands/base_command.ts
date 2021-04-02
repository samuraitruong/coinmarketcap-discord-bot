import { BaseProvider } from '../providers/base_provider';
export class CommandBase {
  percentFormater = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2
  });

  currencyFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 9 });
  compactFormater = Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short"
  });
  constructor(public command: string, public provider: BaseProvider) {

  }
}
