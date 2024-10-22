import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { WebStorageService } from './web-storage.service';
import { CommonMethodsService } from './common-methods.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadPdfExcelService {

  loginData: any;
  imagePath: any;
  userId!: number;

  constructor(
    private webStorage: WebStorageService,
    private commonService:CommonMethodsService
  ) {
    this.loginData = this.webStorage.getLoggedInLocalstorageData();
    this.userId = this.loginData.id;
  }

  generateExcel1(excelDetails?:any, tableDetails?:any, summery?:any) {
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(excelDetails?.nameArr[0].sheet_name);
    worksheet.getColumn(1).width = 20;
    //add image
    var lastColumn = this.getLastCHar(excelDetails?.keyHeader);
    // worksheet.mergeCells('C1:G1');
    worksheet.mergeCells('A1:' + lastColumn + '1');
    worksheet.getRow(1).height = 25;
    this.setExcelCellStyle(worksheet.getCell('C1'), (excelDetails?.excelHeaderDetails?.organizationName || 'Hitech Dairy Pvt. Ltd.'), 'org');
    // worksheet.mergeCells('C2:G2');
    worksheet.mergeCells('A2:' + lastColumn + '2');
    worksheet.getRow(2).height = 20;
    this.setExcelCellStyle(worksheet.getCell('C2'), (excelDetails?.excelHeaderDetails?.unitName || ''), 'unit');
    worksheet.mergeCells('A3:' + lastColumn + '3');
    worksheet.getRow(3).height = 20;
    this.setExcelCellStyle(worksheet.getCell('C3'), (!excelDetails?.additionalDetails?.title ? excelDetails?.nameArr[0]?.sheet_name : excelDetails?.additionalDetails?.title), 'excelHeader');
    if (excelDetails?.additionalDetails) {
      worksheet.mergeCells('A4:' + lastColumn + '4');
      worksheet.getRow(4).height = 15;
      this.setExcelCellStyle(worksheet.getCell(lastColumn + "4"), (excelDetails?.additionalDetails?.dateLabel + ' - ' + excelDetails?.additionalDetails.date), 'additionalDetails');
    }
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(excelDetails?.keyHeader); // Add Header Row

    let result: any = tableDetails.map((obj: any, o: any) => {
      let filterObj: any = {};
      for (let i = 0; i < excelDetails?.apiKeys.length; i++) {
        var keyWithIdx = excelDetails?.apiKeys[i];
        filterObj['Sr. No.'] = o + 1;
        filterObj[keyWithIdx] = (excelDetails?.toFixedAmount?.length && excelDetails?.toFixedAmount[i] > 0) ? this.commonService?.setDigitsAfterDecimal(obj[keyWithIdx], excelDetails?.toFixedAmount[i]) : (obj[keyWithIdx] || '-');
        if(excelDetails?.dateArr?.length){
          excelDetails?.dateArr.map((val: any) => {
            filterObj[keyWithIdx] = (val == keyWithIdx ? this.commonService.dateFormat(filterObj[keyWithIdx], 'date') : filterObj[keyWithIdx]);
          })
        }
        if(excelDetails?.CRDREntities?.length){
          excelDetails?.CRDREntities.map((val: any) => {
            filterObj[keyWithIdx] = (val == keyWithIdx ? this.commonService.convertBalanceToCRDR(filterObj[keyWithIdx] || 0) : filterObj[keyWithIdx]);
          })
        }
      }
      return filterObj;
    });

    headerRow.eachCell((cell: any) => { // Cell Style : Fill and Border
      this.setExcelCellStyle(cell, '', 'tableHeadingCell');
    });

    for (var i = 0; i < excelDetails?.headerKeySize.length; i++) {
      worksheet.getColumn(i + 1).width = excelDetails?.headerKeySize[i];
    }

    //  Add Data
    result.map((d: any) => {
      const dataStying = worksheet.addRow(Object.values(d));
      dataStying.eachCell((cell: any) => {
        this.setExcelCellStyle(cell, '', 'tableDataCell');
      });
    });

    if (excelDetails.summeryIndex?.length && summery) {
      const endRow = worksheet.lastRow ? (worksheet.lastRow.number + 1) : 0;
      for (let i = 0; i < excelDetails.summeryIndex.length; i++) {
        var sKeyVal = excelDetails?.summeryKeys[i];
        if(excelDetails?.summeryWithCRDR?.length){
          excelDetails?.summeryWithCRDR.map((val: any) => {
            summery[sKeyVal] = (val == sKeyVal ? this.commonService.convertBalanceToCRDR(summery[sKeyVal] || 0) : summery[sKeyVal]);
          })
        }
        this.setExcelCellStyle(worksheet.getCell(excelDetails.summeryIndex[i] + endRow), (sKeyVal=='Total' ? sKeyVal : typeof summery[sKeyVal] == 'string' ? summery[sKeyVal] : this.commonService.setTwoDigitsAfterDecimal(summery[sKeyVal])), 'summery');
   }
    }

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      this.createBlobToDownloadExcel(data, excelDetails?.nameArr[0].excel_name);
    });
  }

  createBlobToDownloadExcel(data: any, excelName: any){
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(blob, excelName);
  }

  generateExcel(keyData: any, apiKeys: any, data: any, name: any, headerKeySize?: any, additionalData?: any, total?: any) {
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name[0].sheet_name);
    worksheet.getColumn(1).width = 20;
    //add image
    var lastColumn = this.getLastCHar(keyData);
    // worksheet.mergeCells('C1:G1');
    worksheet.mergeCells('A1:' + lastColumn + '1');
    worksheet.getRow(1).height = 25;
    worksheet.getCell('C1').value = this.userId != 1 ? this.loginData?.organizationName : 'Hitech Dairy Pvt. Ltd.';
    worksheet.getCell('C1').alignment = { vertical: 'bottom', horizontal: 'center' };
    worksheet.getCell('C1').font = { size: 18, bold: true, color: { argb: '000000' } };
    worksheet.getCell("C1").border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    // worksheet.mergeCells('C2:G2');
    worksheet.mergeCells('A2:' + lastColumn + '2');
    worksheet.getRow(2).height = 20;
    worksheet.getCell('C2').value = this.userId != 1 ? this.loginData?.unitName : '';
    worksheet.getCell('C2').alignment = { vertical: 'bottom', horizontal: 'center' };
    worksheet.getCell('C2').font = { size: 12, bold: false, color: { argb: '000000' } };
    worksheet.getCell("C2").border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.mergeCells('A3:' + lastColumn + '3');
    worksheet.getRow(3).height = 20;
    worksheet.getCell("C3").border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C3').value = !additionalData?.title ? name[0]?.sheet_name : additionalData?.title;
    worksheet.getCell('C3').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C3').font = { size: 11, bold: false, color: { argb: '000000' } };
    worksheet.getCell('C3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D0D3D4' }, bgColor: { argb: 'D0D3D4' } };

    if (additionalData?.date) {
      worksheet.mergeCells('A4:' + lastColumn + '4');
      worksheet.getRow(4).height = 15;
      worksheet.getCell(lastColumn + "4").border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      worksheet.getCell(lastColumn + "4").value = additionalData?.dateLabel + ' - ' + additionalData.date;
      worksheet.getCell(lastColumn + "4").alignment = { vertical: 'top', horizontal: 'right' };
      worksheet.getCell(lastColumn + "4").font = { size: 11, bold: false, color: { argb: '000000' } };
    }
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(keyData); // Add Header Row

    let result: any = data.map((obj: any, o: any) => {
      let filterObj: any = {};
      for (let i = 0; i < apiKeys.length; i++) {
        filterObj['Sr. No.'] = o + 1;
        filterObj[apiKeys[i]] = obj[apiKeys[i]] ? obj[apiKeys[i]] : '-';
      }
      return filterObj;
    });

    headerRow.eachCell((cell: any) => { // Cell Style : Fill and Border
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'C0C0C0' }, bgColor: { argb: 'C0C0C0' } };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.font = { bold: true };
    });

    for (var i = 0; i < headerKeySize.length; i++) {
      worksheet.getColumn(i + 1).width = headerKeySize[i];
    }

    //  Add Data
    result.map((d: any) => {
      const dataStying = worksheet.addRow(Object.values(d));
      dataStying.eachCell((cell: any) => {
        cell.font = {
          align: 'left'
        };
        cell.alignment = {
          vertical: 'middle', horizontal: /*total?'right':*/'left'
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    if (total) {
      const endRow = worksheet.lastRow ? (worksheet.lastRow.number + 1) : 0;
      for (let i = 0; i < total.length; i++) {
        worksheet.getCell(total[i]?.totalCell + endRow).value = typeof total[i]?.amount == 'string' ? total[i]?.amount : total[i]?.amount.toFixed(2);
        worksheet.getCell(total[i]?.totalCell + endRow).alignment = { vertical: 'top', horizontal: 'right' };
        worksheet.getCell(total[i]?.totalCell + endRow).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
          worksheet.getCell(total[i]?.totalCell + endRow).font = { size: 12, bold: true, color: { argb: '000000' } }
      }
    }

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, name[0].excel_name);
    });
  }


  getLastCHar(keyData: any) {
    let rem = keyData.length % 26;
    let columnEnd = String.fromCharCode((rem - 1) + 'A'.charCodeAt(0));
    return columnEnd
  }

  setExcelCellStyle(cell: any, value: any, flag: any){
    switch(flag){
      case 'org':
        cell.alignment = { vertical: 'bottom', horizontal: 'center' };
        cell.font = { size: 18, bold: true, color: { argb: '000000' } };
      break;
      case 'unit':
        cell.alignment = { vertical: 'bottom', horizontal: 'center' };
        cell.font = { size: 12, bold: false, color: { argb: '000000' } };
      break;
      case 'excelHeader':
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { size: 11, bold: true, color: { argb: '000000' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D0D3D4' }, bgColor: { argb: 'D0D3D4' } };
      break;
      case 'tableHeadingCell':
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D0D3D4' }, bgColor: { argb: 'D0D3D4' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      break;
      case 'tableDataCell':
        cell.font = { align: 'left' };
        cell.alignment = { vertical: 'middle', horizontal: 'left'};
      break;
      case 'summery':
        cell.font = { size: 12, bold: true, color: { argb: '000000' }};
        cell.alignment = { vertical: 'top', horizontal: 'right'};
      break;
      case 'additionalDetails':
        cell.font = { size: 11, bold: false, color: { argb: '000000' } };
        cell.alignment = { vertical: 'top', horizontal: 'right'};
      break;
    }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    value ? cell.value = value : '';
    return cell;
  }

  downLoadPdf(_keyData: any, _apiKeys: any, _data: any, _name: any, _pageName?: any, _headerKeySize?: any, _filterData?: any) {
    // this.master.convertImageIntoBase64(this.userId != 1 ? this.loginData.logoImage : 'https://demo.hitechdairy.in/assets/images/HitechDairy-logo-color.png').subscribe((res: any) => {
    //   this.imagePath = res.responseData;
    //   let doc: any = new jsPDF();
    //   doc.addImage(this.imagePath, 'JPEG', 10, 10, 60, 17);
    //   let orgName = this.userId != 1 ? this.loginData.orgName : 'Hitech Dairy Pvt. Ltd.';
    //   orgName ? doc.text(orgName, (200 - orgName?.length * 3), 15) : '';
    //   doc.setFontSize(10.5);
    //   let regNo: any = ('Registration No. : ' + (this.loginData?.registrationNo ? this.loginData?.registrationNo : '-'))
    //   doc.text(regNo, (200 - (regNo.length) * 1.93), 21);
    //   let gstNo: any = ('GST No. : ' + (this.loginData?.gstNo ? this.loginData?.gstNo : '-'));
    //   doc.text(gstNo, (200 - (gstNo.length) * 2.15), 26);
    //   let emailX: any = (200 - (this.loginData?.orgEmail?.length * 2));
    //   this.loginData?.orgEmail ? doc.addImage("assets/images/email-icon.png", "JPEG", (emailX - 6), 27, 5, 5) : '';
    //   this.loginData.orgEmail ? doc.text(this.loginData.orgEmail, emailX, 31) : '';
    //   this.loginData?.orgMobileNo ? (doc.addImage("assets/images/mobile-logo.png", "JPEG", this.loginData?.orgEmail ? ((emailX - this.loginData?.orgEmail?.length) - 12) : (200 - (this.loginData?.orgMobileNo?.length * 2.6) - 6), 27, 5, 5)) : '';
    //   (this.loginData?.orgMobileNo || this.loginData?.orgEmail) ? (doc.text(this.loginData?.orgMobileNo, this.loginData?.orgEmail ? (emailX - this.loginData?.orgEmail?.length - 6) : (200 - (this.loginData?.orgMobileNo?.length * 2.6)), 31)) : '';
    //   this.loginData?.address ? doc.text('Address : ' + this.loginData?.address, 10, 38) : '';
    //   doc.setFontSize(20);
    //   doc.setFillColor("#1e94a4");
    //   doc.setDrawColor("#1e94a4");
    //   let reactY = (this.loginData?.address && (this.loginData?.orgMobileNo || this.loginData?.orgEmail)) ? 50 : (!this.loginData?.address && (!this.loginData?.orgMobileNo || !this.loginData?.orgEmail)) ? 36 : 43;
    //   doc.roundedRect(5, reactY, 200, 13, 0, 0, 'FD');
    //   doc.setTextColor("#FFFFFF");
    //   let x = 195 / 2 - pageName?.length * 2;
    //   doc.text(x, (reactY + 9), pageName);
    //   doc.setFontSize(10);
    //   doc.setTextColor("#000000");
    //   if (filterData) {
    //     if (filterData.filterValue) {
    //       let x = 200 - (filterData.filterValue)?.length * 2;
    //       doc.text(filterData.filterValue, x, reactY + 19);
    //     }

    //     if (filterData.fromDate && filterData.toDate) {
    //       let x = ('From : ' + filterData.fromDate + '    To : ' + filterData.toDate);
    //       doc.text(x, (200 - (x?.length) * 1.7), (filterData.filterValue ? reactY + 25 : reactY + 19));
    //     }
    //   }
    //   let columnWidthObj: any = {};
    //   let result: any = data.map((obj: any, o: any) => {
    //     let filterObj: any = {};
    //     for (let i = 0; i < apiKeys.length; i++) {
    //       filterObj['Sr. No.'] = o + 1;
    //       filterObj[apiKeys[i]] = obj[apiKeys[i]];
    //       columnWidthObj[i] = { cellWidth: headerKeySize[i] }
    //     }
    //     return filterObj;
    //   });
    //   let drawCell = function (data: any) {
    //     var doc = data.doc;
    //     var rows = data.table.body;
    //     if (rows.length === 1) {
    //     } else if (data.row.index === rows.length - 1) {
    //       doc.setFontSize("10");
    //       doc.setFillColor(255, 255, 255);
    //     }
    //   };
    //   var outputArr = result.map((r: any) => Object.keys(r).map(e => r[e]));
    //   doc.autoTable(keyData, outputArr, {
    //     startY: (filterData?.filterValue && filterData?.fromDate) ? (reactY + 28) : (!filterData?.filterValue && !filterData?.fromDate) ? (reactY + 19) : (reactY + 22),
    //     rowPageBreak: 'avoid',
    //     theme: 'grid',
    //     headStyles: { fillColor: "#1e94a4" },
    //     margin: { left: 5, right: 5 },
    //     columnStyles: columnWidthObj,
    //     willDrawCell: drawCell
    //   });
    //   doc.save(name[0].topHedingName);
    // })
  }
}
