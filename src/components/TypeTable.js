import { TYPES } from "./constants";
import TypePill from "./TypePill";

export default function TypeTable() {
  return (
    <table className="table h-full min-h-1" data-testid="type-table">
      <thead data-testid="type-table-header">
        <tr>
          <th scope="col" />
          {TYPES.map((type) => (
            <th key={`${type.name}-header`} scope="col" data-testid={`${type.name}-column-header`}>
              <TypePill typeName={type.name} compact size="md" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody data-testid="type-table-body">
        {TYPES.map((attackingType) => (
          <tr
            key={`${attackingType.name}-row`}
            className="table-row h-1"
            data-testid={`${attackingType.name}-attacking-row`}
          >
            <th scope="row" className="h-full">
              <TypePill typeName={attackingType.name} size="md" />
            </th>
            {TYPES.map((defendingType) => {
              return (
                <td
                  key={`${defendingType.name}-cell`}
                  className="table-cell text-center border border-gray-400 p-0 h-full align-middle"
                  data-testid={`${attackingType.name}-vs-${defendingType.name}`}
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
