export default function Operation({
  arbiter,
  beneficiary,
  depositor,
  amount,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Depositor </div>
          <div> {depositor} </div>
        </li>
        <li>
          <div> Amount </div>
          <div> {amount} </div>
        </li>
        
         
      </ul>
    </div>
  );
}
