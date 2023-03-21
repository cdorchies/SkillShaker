export default function MenuConversations(props) {
  return (
    <ul className="menuMessage" key={props.index}>
      <li>Signaler le message</li>
      <li>Signaler l'utilisateur</li>
      <li>Bloquer l'utilisateur</li>
      <li>Supprimer les tags associés</li>
    </ul>
  );
}
