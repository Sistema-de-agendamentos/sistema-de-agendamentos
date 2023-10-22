import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_PT_BR as MRTLocalizationPTBR } from "material-react-table/locales/pt-BR";

function Table({ state, ...rest }) {
  return (
    <MaterialReactTable
      localization={MRTLocalizationPTBR}
      state={{ density: "compact", ...state }}
      enableColumnActions={false}
      muiTablePaperProps={{
        sx: {
          background: "none",
          boxShadow: "none",
        },
      }}
      muiTopToolbarProps={{ sx: { display: "none" } }}
      muiTableHeadRowProps={{
        sx: {
          display: "flex",
          justifyContent: "space-between",
          background: "none",
          boxShadow: "none",
        },
      }}
      muiTableBodyRowProps={{
        sx: {
          display: "flex",
          justifyContent: "space-between",
          margin: ".25rem 0",
          borderRadius: ".25rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, .2)",
        },
      }}
      muiTableBodyCellProps={({ column }) => {
        return {
          sx: {
            flex:
              column.id === "mrt-row-expand" ? 1 : column.columnDef.size || 1,
            borderBottom: "none",
            background: "none",
            display: "flex",
            alignItems: "center",
          },
        };
      }}
      muiTableHeadCellProps={({ column }) => {
        return {
          sx: {
            flex:
              column.id === "mrt-row-expand" ? 1 : column.columnDef.size || 1,
            borderBottom: "none",
            background: "none",
          },
        };
      }}
      muiBottomToolbarProps={{
        sx: {
          borderRadius: ".25rem",
          background: "none",
          boxShadow: "none",
        },
      }}
      {...rest}
    />
  );
}

export default Table;
