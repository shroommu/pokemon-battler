import TypePill from "./TypePill";
import TypePillVertical from "./TypePillVertical";

const types = [
  { name: "Bug" },
  { name: "Dragon" },
  { name: "Electric" },
  { name: "Fighting" },
  { name: "Fire" },
  { name: "Flying" },
  { name: "Ghost" },
  { name: "Grass" },
  { name: "Ground" },
  { name: "Ice" },
  { name: "Normal" },
  { name: "Poison" },
  { name: "Psychic" },
  { name: "Rock" },
  { name: "Water" },
];

export default function TypeTable() {
  return (
    <table>
      <thead>
        <td />
        {types.map((type) => (
          <td>
            <TypePillVertical typeName={type.name}>
              {type.name}
            </TypePillVertical>
          </td>
        ))}
      </thead>
      <tbody>
        {types.map((type) => (
          <tr>
            <td>
              <TypePill typeName={type.name}>{type.name}</TypePill>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
