const express = require("express");

// const { Record } = require("../api/srchRecords");
const { Record } = require("../api/records");
const { Login } = require("../api/login");
const { MyFiles } = require("../api/files");
const { getAllAttachments } = require("../api/attachments");
const { CustomerRef } = require("../api/customerRefer");
const { Variable } = require("../api/Others/variables");
const { EditProfile } = require("../api/editProfile");
const { changePassword } = require("../api/changePassword");
const { editDetails } = require("../api/editDetails");
const { docAccessToken, uploadFileOnline } = require("../api/docAccess");
const { getVideos } = require("../api/videos");
const { getRp } = require("../api/rp");
const { getClientDetails } = require("../api/clientpg");
const { signUp } = require("../api/signup");
const {
  updtTodoList,
  addNotes,
  addAttachments,
  referClient,
  creditMonitor,
} = require("../api/clientActions");
const { forgotPwd, resetPwd } = require("../api/forgot");
const fs = require("fs");

// const { Query } = require("../api/getAllRecords");
// const {ContactRole} = require("../api/getContactRoles")
// const {Module} = require("../api/getModules")

const myRoutes = express.Router();

myRoutes.route("/login").post(async function (req, response) {
  console.log(req);
  let obj = req.body;

  let res = await Login.searchRecords("RPs", obj.username, obj.password);

  response.json(res);
});

myRoutes.route("/loginclient").post(async function (req, response) {
  let obj = req.body;

  let res = await Login.searchRecords("Contacts", obj.username, obj.password);

  response.json(res);
});

myRoutes.route("/contacts/:id").get(async function (req, response) {
  // let obj = req.body;

  // let res = await Query.getRecords();
  // let res = await Module.getModules();
  // let res = await ContactRole.getContactRoles();
  let id = req.params.id;

  let res = await Record.getRecords(`RPs/${id}/Clients`);
  // response.json(res)

  if (res instanceof Array && res[res.length - 1] === "OK") {
    res.pop();

    let resData = res.map((elm) => {
      // console.log(elm)
      return {
        contact_id: elm.id,
        firstname: elm.First_Name,
        last_name: elm.Last_Name,
        email: elm.Email,
        phone: elm.Phone,
        created_time: elm.Created_Time,
        modified_time: elm.Modified_Time,
        fullname: elm.Full_Name,
        status: elm.Call_Status,
        type: elm.Record_Type,
        Username: elm.Username,
        Password: elm.Password,
        score_needed: elm.Score_Needed,
        folder_status: elm.Folder,
        rfullname: `${elm.Last_Name}, ${elm.First_Name}`,
      };
    });

    resData.push("OK");
    // console.log(res)
    response.json(resData);
  } else {
    response.json(res);
  }
});

myRoutes.route("/leads/:id").get(async function (req, response) {
  let id = req.params.id;

  let res = await Record.getRecords(`RPs/${id}/Leads`);

  if (res instanceof Array && res[res.length - 1] === "OK") {
    res.pop();
    let resData = res.map((elm) => {
      return {
        contact_id: elm.id,
        firstname: elm.First_Name,
        last_name: elm.Last_Name,
        email: elm.Email,
        phone: elm.Phone,
        created_time: elm.Created_Time,
        modified_time: elm.Modified_Time,
        fullname: elm.Full_Name,
        status: elm.Call_Status,
        type: elm.Loan_Type,
        score_needed: elm.Score_Needed,
        rfullname: `${elm.Last_Name}, ${elm.First_Name}`,
      };
    });

    resData.push("OK");
    // console.log(res)
    response.json(resData);
  } else {
    response.json(res);
  }
});

myRoutes.route("/files/:id").get(async function (req, response) {
  let id = req.params.id;
  let res1 = await MyFiles.getCommonFiles();
  let res2 = await getAllAttachments(id, "RPs");

  let res = [...res1, ...res2, "OK"];
  console.log(res);
  response.json(res);
});

///work in progress... more dynamic
myRoutes.route("/download/:myfile").get((req, res) => {
  let file = `./assets/upload_for_flyers/${req.params.myfile}`;

  if (!fs.existsSync(file)) {
    //file exists
    file = `./assets/fileUpload/defaultpic.png`;
  }
  res.download(file);
});

myRoutes.route("/profilepic/:id").get((req, res) => {
  let file = `./assets/fileUpload/${req.params.id}.jpg`;
  if (!fs.existsSync(file)) {
    //file exists
    file = `./assets/fileUpload/defaultpic.png`;
  }
  res.download(file);
});

myRoutes.route("/profilelogo/:id").get((req, res) => {
  let file = `./assets/rp_logo/${req.params.id}.jpg`;
  if (!fs.existsSync(file)) {
    //file exists
    file = `./assets/fileUpload/defaultpic.png`;
  }
  res.download(file);
});

myRoutes.route("/images/:myfile").get((req, res) => {
  let file = `./assets/images/${req.params.myfile}`;
  if (!fs.existsSync(file)) {
    //file exists
    file = `./assets/fileUpload/defaultpic.png`;
  }
  res.download(file);
});

myRoutes.route("/creditCoachImage/:myfile").get((req, res) => {
  let file = `./assets/creditCoachImage/${req.params.myfile}`;
  if (!fs.existsSync(file)) {
    //file exists
    file = `./assets/fileUpload/defaultpic.png`;
  }
  res.download(file);
});

myRoutes.route("/test").get(async (req, res) => {
  // let response = await Variable.getVariables();
  // let response= await docAccessToken()
  let response = await uploadFileOnline(
    "./assets/uploads/Test_for Upload.txt",
    "test.txt"
  );
  // console.log(response)
  // const file = `./assets/upload_for_flyers/${req.params.myfile}`;
  // res.download(file);
});

myRoutes.route("/customerRefer").post(async function (req, response) {
  console.log(req.body);
  let id = req.body.profileId;
  let res = await CustomerRef.addRefer(id, req.body);
  // console.log('finish');

  if (res instanceof Array && res[res.length - 1] === "OK") {
    // res.push('OK');
    // console.log(res)
    response.json(res);
  } else {
    response.json({ error: res });
  }
});

myRoutes.route("/editProfile").post(async function (req, response) {
  // console.log(req.body)
  // let id = req.body.profileId
  let res = await EditProfile.update(req.body);
  // // console.log('finish');

  if (res instanceof Array && res[res.length - 1] === "OK") {
    // res.push('OK');
    // console.log(res)
    response.json(res);
  } else {
    response.json({ error: res });
  }
});

myRoutes.route("/changePassword").post(async function (req, response) {
  // console.log(req.body)
  // let id = req.body.profileId
  let res = await changePassword(req.body);
  // // console.log('finish');

  if (res instanceof Array && res[res.length - 1] === "OK") {
    // res.push('OK');
    // console.log(res)
    response.json(res);
  } else {
    response.json({ error: res });
  }
});

myRoutes.route("/editDetails").post(async function (req, response) {
  // console.log(req.body)
  // let id = req.body.profileId
  let res = await editDetails(req.body);
  // // console.log('finish');

  if (res instanceof Array && res[res.length - 1] === "OK") {
    // res.push('OK');
    // console.log(res)
    response.json(res);
  } else {
    response.json({ error: res });
  }
});

myRoutes.route("/videos").get(async function (req, response) {
  let res = await getVideos();
  // console.log(res)

  if (res instanceof Array && res[res.length - 1] === "OK") {
    // console.log(res)
    response.json(res);
  } else {
    response.json([]);
  }
});

myRoutes.route("/rppage/:id").get(async function (req, response) {
  let res = await getRp(req.params.id);
  // console.log(res)

  response.json(res);
});

myRoutes.route("/clientpg/:id").get(async function (req, response) {
  let res = await getClientDetails(req.params.id);
  console.log(res);

  response.json(res);
});

myRoutes.route("/updtTodoList").post(async function (req, response) {
  let obj = req.body;

  let res = await updtTodoList(obj);

  response.json(res);
});

myRoutes.route("/addNotes").post(async function (req, response) {
  let obj = req.body;

  let res = await addNotes(obj);

  response.json(res);
});

myRoutes.route("/addAttachments").post(async function (req, response) {
  let obj = req.body;

  let res = await addAttachments(obj);

  response.json(res);
});

myRoutes.route("/referClient").post(async function (req, response) {
  let obj = req.body;

  let res = await referClient(obj);

  response.json(res);
});

myRoutes.route("/creditMonitor").post(async function (req, response) {
  let obj = req.body;

  let res = await creditMonitor(obj);

  response.json(res);
});

myRoutes.route("/signup").post(async function (req, response) {
  let obj = req.body;
  let res = await signUp(obj);
  response.json(res);
});

myRoutes.route("/forgot").post(async function (req, response) {
  let obj = req.body;
  let res = await forgotPwd(obj);
  response.json(res);
});

myRoutes.route("/reset").post(async function (req, response) {
  let obj = req.body;
  let res = await resetPwd(obj);
  response.json(res);
});

module.exports = myRoutes;
