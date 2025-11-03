import { types } from "./constants";
import TypePill from "./TypePill";

export default function TypeTable() {
  return (
    <table className="table h-full min-h-1">
      <thead>
        <td />
        {types.map((type) => (
          <td key={`${type.name}-header`}>
            <TypePill typeName={type.name} compact size="md" />
          </td>
        ))}
      </thead>
      <tbody>
        {types.map((attackingType) => (
          <tr key={`${attackingType.name}-row`} className="table-row h-1">
            <td className="h-full">
              <TypePill typeName={attackingType.name} size="md" />
            </td>
            {types.map((defendingType) => {
              return (
                <td
                  key={`${defendingType.name}-cell`}
                  className="table-cell text-center border border-gray-400 p-0 h-full align-middle"
                >
                  {(defendingType.weaknesses.includes(attackingType.name) && (
                    <div className="flex w-full h-full items-center justify-center bg-green-600 text-white text-xs">
                      2x
                    </div>
                  )) ||
                    (defendingType.resistances.includes(attackingType.name) && (
                      <div className="flex w-full h-full items-center justify-center bg-red-600 text-white text-xs">
                        ½x
                      </div>
                    )) ||
                    (defendingType.immunes.includes(attackingType.name) && (
                      <div className="flex w-full h-full items-center justify-center bg-gray-600 text-white text-xs">
                        0
                      </div>
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
