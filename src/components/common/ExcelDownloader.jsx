import ExcelJS from "exceljs";
import OutlineBtn from "../btn/OutlineBtn";

export default function ExcelDownloader({ data, buttonText }) {
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Summary");

    const columnsSet = new Set();

    const rows = data.map((item) => {
      if (Object.keys(item).length > 0) {
        Object.keys(item).forEach((key) => columnsSet.add(key));
        return item;
      }
      return { Placeholder: "" };
    });

    const columnsArray = Array.from(columnsSet).map((key) => ({
      header: key,
      key: key,
      width: 15,
    }));

    worksheet.columns = columnsArray;

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
