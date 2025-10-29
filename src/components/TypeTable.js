import { types } from "./constants";
import TypePill from "./TypePill";
import TypePillVertical from "./TypePillVertical";

export default function TypeTable() {
  return (
    <table>
      <thead>
        <td />
        {types.map((type) => (
          <td key={`${type.name}-header`}>
            <TypePillVertical typeName={type.name}>
              {type.name}
            </TypePillVertical>
          </td>
        ))}
      </thead>
      <tbody>
        {types.map((attackingType) => (
          <tr key={`${attackingType.name}-row`}>
            <td>
              <TypePill typeName={attackingType.name}>
                {attackingType.name}
              </TypePill>
            </td>
            {types.map((defendingType) => {
              return (
                <td key={`${defendingType.name}-cell`} className="text-center">
                  {(defendingType.weaknesses.includes(attackingType.name) && (
                    <div className="w-full h-full bg-green-400">2x</div>
                  )) ||
                    (defendingType.strengths.includes(attackingType.name) && (
                      <div className="w-full h-full bg-red-400">1/2x</div>
                    ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
