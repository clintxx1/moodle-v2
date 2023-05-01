import React from "react";
import {
  Document,
  Page,
  Image,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerImageWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerImageSpacer: {
    width: 10,
  },
  headerWrapper: {
    flexDirection: "column",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 10,
    color: "#555",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#555",
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 12,
    backgroundColor: "#eee",
    fontWeight: "bold",
    flexGrow: 1,
    padding: 5,
    textAlign: "center",
  },
  tableCell: {
    fontSize: 12,
    flexGrow: 1,
    padding: 5,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "left",
    fontSize: 12,
    color: "grey",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopWidth: 1,
    borderColor: "#555",
  },
  footerRight: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "right",
    fontSize: 12,
    color: "grey",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  batchPassingRate: {
    textAlign: "right",
    fontSize: 12,
  },
  divider: {
    paddingTop: 30,
  },
});

const PDFDocument = ({
  passingStudents,
  failingStudents,
  headerImageSrc,
  batchPassingRate,
  printedBy,
  time,
}) => (
  <Document>
    <Page style={styles.page}>
      {/* This part is the header of the file */}
      <View style={styles.header}>
        {/* This is the Image of the Header */}
        <View style={styles.headerImageWrapper}>
          <Image style={styles.headerImage} src={headerImageSrc} />
          <View style={styles.headerImageSpacer}></View>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerSubText}>
              Republic of the Philippines
            </Text>
            <Text style={styles.headerText}>
              Northwest Samar State University
            </Text>
            <Text style={styles.headerSubText}>
              Rueda St., Calbayog City 6710
            </Text>
            <Text style={styles.headerSubText}>
              Website: http://www.nwssu.edu.ph
            </Text>
            <Text style={styles.headerSubText}>Email: main@nwssu.edu.ph</Text>
            <Text style={styles.headerSubText}>Telefax: (055) 2093657</Text>
          </View>
        </View>
      </View>

      <View style={styles.batchPassingRate}>
        <Text>Batch Passing Rate: {batchPassingRate}%</Text>
      </View>

      {/* PASSING STUDENT TABLE*/}
      <View>
        <Text style={styles.title}>Passing Students Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text>Student Name</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text>Passing Rate</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text>Prediction</Text>
          </View>
        </View>
        {passingStudents.map((item, index) => (
          <View key={index} style={styles.table}>
            <View style={styles.tableCell}>
              <Text>{item.studentName}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.passingRate}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.prediction}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* FAILING STUDENT TABLE*/}
      <View style={styles.divider}>
        <Text style={styles.title}>Passing Students Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text>Student Name</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text>Passing Rate</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text>Prediction</Text>
          </View>
        </View>
        {failingStudents.map((item, index) => (
          <View key={index} style={styles.table}>
            <View style={styles.tableCell}>
              <Text>{item.studentName}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.passingRate}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.prediction}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer: Printed by and Date */}
      <Text style={styles.footer}>Printed by: {printedBy}</Text>
      <Text style={styles.footerRight}>Date: {time}</Text>
    </Page>
  </Document>
);

export default PDFDocument;
