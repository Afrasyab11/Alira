export const SUSPENDCORS_COLUMNS = [
  { header: "Correspondence Number", accessorKey: "correspondenceNumber" },
  { header: "Subject", accessorKey: "correspondenceSubject" },
  { header: "Received On (Hijri)", accessorKey: "formattedReceivedOnHijriDate" },
  { header: "Date", accessorKey: "correspondenceDate" },
  { header: "Hijri Year", accessorKey: "hijricYear" },
  { header: "Sequence Number", accessorKey: "formattedSequenceNumber" },
  { header: "Suspended Date", accessorKey: "suspendedDate" },
  { header: "Type", accessorKey: "formattedType" },
  { header: "Row Number", accessorKey: "correspondenceRowNo" },
  { header: "Correspondence Type", accessorKey: "correspondenceType" },
];

export const FOLLOWUP_COLUMNS = [
  { headerName: "Correspondence Number", target: "correspondenceNumber" },
  { headerName: "Subject", target: "correspondenceSubject" },
  { headerName: "Date", target: "correspondenceDate" },
  { headerName: "Row Number", target: "correspondenceRowNo" },
  { headerName: "Correspondence Type", target: "correspondenceType" },
];