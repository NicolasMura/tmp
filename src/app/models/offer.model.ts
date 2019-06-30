export class Offer {
  type:	        string;
  humanType:    string;
  value:	      number;
  sliceValue?:  number;
  offerAmount:  number; // montant de la remise appliquée sur le panier en cours
  newCartPrice: number; // prix du panier en cours une fois la remise offerAmount appliquée
}