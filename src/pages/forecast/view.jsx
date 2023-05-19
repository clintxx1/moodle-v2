import { Button, Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../../lib/PDFDocument";
import nwssu from "../../assets/nwssu.png";
import moment from "moment/moment";
import auth from "../../lib/services";

const ForecastView = () => {
  const {
    passData,
    failData,
    columns,
    loadingPassedData,
    loadingFailedData,
    batchPassingRate,
  } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Reports</p>
      </div>
      <div className="flex flex-row items-center justify-between my-3 w-full px-5 py-2 mr-5">
        <PDFDownloadLink
          document={
            <PDFDocument
              printedBy={`${auth.getUserInfo().firstName} ${
                auth.getUserInfo().lastName
              }`}
              passingStudents={passData ?? []}
              failingStudents={failData ?? []}
              batchPassingRate={batchPassingRate}
              headerImageSrc={nwssu}
              time={moment().format("LLL")}
            />
          }
          fileName="forecast-report.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              ""
            ) : (
              <Button type="primary" size="large">
                Export PDF
              </Button>
            )
          }
        </PDFDownloadLink>

        <div className="flex flex-row items-center justify-between border border-gray-300 px-5 py-2">
          <p className="text-lg">Batch Passing Rate: &nbsp;</p>
          {batchPassingRate && (
            <div className="text-lg rounded-full bg-gray-300 border border-gray-500 p-5">{`${batchPassingRate}%`}</div>
          )}
        </div>
      </div>
      <p className="font-semibold text-2xl mx-5 mt-5">Passing Students</p>
      <Table
        key={crypto.randomUUID()}
        loading={loadingPassedData}
        dataSource={passData ?? []}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
      <p className="font-semibold text-2xl mx-5 mt-5">Failing Students</p>
      <Table
        key={crypto.randomUUID()}
        loading={loadingFailedData}
        dataSource={failData ?? []}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default ForecastView;
