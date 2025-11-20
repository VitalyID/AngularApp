export function typeBankCard(): string {
  const random = Math.round(Math.random());
  return random === 1
    ? '../../../assets/images/Master card.png'
    : '../../../assets/images/Visa card.png';
}
