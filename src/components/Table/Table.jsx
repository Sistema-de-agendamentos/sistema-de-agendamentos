import { MaterialReactTable } from "material-react-table";

function Table(props) {
  return (
    <MaterialReactTable
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
          margin: ".25rem 0",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: ".25rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, .2)",
          height: "2.5rem",
        },
      }}
      muiTableBodyCellProps={({ column }) => {
        return {
          sx: {
            borderBottom: "none",
            background: "none",
            flex: column.columnDef.size,
            lineHeight: ".625",
          },
        };
      }}
      muiTableHeadCellProps={({ column }) => {
        return {
          sx: {
            borderBottom: "none",
            background: "none",
            flex: column.columnDef.size,
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
      {...props}
    />
  );
}

export default Table;
