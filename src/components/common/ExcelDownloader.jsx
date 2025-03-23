import ExcelJS from "exceljs";
import OutlineBtn from "../btn/OutlineBtn";

export default function ExcelDownloader({ data, buttonText }) {
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Summary");

    // Use a Set to collect unique column headers
    const columnsSet = new Set();

    // First pass to collect headers and prepare rows
    const rows = data.map((item) => {
      if (Object.keys(item).length > 0) {
        // Add keys to the set for headers
        Object.keys(item).forEach((key) => columnsSet.add(key));
        return item;
      }
      // Return a placeholder for empty objects if necessary
      return { Placeholder: "" }; // or any other relevant data
    });

    // Convert the Set to an array for column definitions
    const columnsArray = Array.from(columnsSet).map((key) => ({
      header: key,
      key: key,
      width: 15, // Set width as needed
    }));

    // Set the columns to the worksheet
    worksheet.columns = columnsArray;

    // Add rows to the worksheet
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <OutlineBtn onClick={handleDownload} fullWidth={false}>
      {buttonText}
    </OutlineBtn>
  );
}
