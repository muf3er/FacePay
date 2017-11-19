'use strict'
const fs = require('fs');
const path = require('path');
const async = require('async');
const request = require('request');
const gm = require('gm');

// TODO: Replace TOKEN with your own Sighthound Cloud Token
const recoConfig = {
  TOKEN: '9mti9QI2h9ctG1fk5NdDrywkR6GKvAxdf43K',
  BASE_URL: 'https://dev.sighthoundapi.com/v1'
}

function genericCallback(error, response, body) {
  if (!error && (response.statusCode == 200 || response.statusCode == 204)) {
    console.log(body, '\n');
  } else if (error) {
    console.log(error, '\n');
  } else {
    console.log(response.statusCode, body, '\n');
  }
}

function createGroup(groupId,objects){
  const requestOptions = {
    url: `${recoConfig.BASE_URL}/group/${groupId}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': recoConfig.TOKEN
    },
    method: 'PUT',
    body:JSON.stringify({objectIds: objects})
  };
  request(requestOptions,genericCallback);
}

function recognize(groupId,data){
  var image = new Image();
  image.src = data;
  function recoCallback(error, response, body) {
    if (!error && (response.statusCode == 200)) {
      console.log('Recognition success:', body);
    } else if (error) {
      console.error(error);
    } else {
      console.error('error: ', response.statusCode, response.statusMessage);
    }
  }

  const requestOptions = {
    url: `${recoConfig.BASE_URL}/recognition?groupId=family2`,
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-Access-Token': recoConfig.TOKEN
    },
    method: 'POST',
    body: image
  }
  request(requestOptions,recoCallback);
}

function getGroup(groupID){
  const requestOptions = {
    url: `${recoConfig.BASE_URL}/group/${groupID}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': recoConfig.TOKEN
    },
    method: 'GET'
  };
  request(requestOptions,genericCallback);
}

function authenticate(objectId,imageData){
  var image = new Image();
  image.src = imageData;
  function recoCallback(error, response, body) {
    if (!error && (response.statusCode == 200)) {
      console.log('Recognition success:', body);
    } else if (error) {
      console.error(error);
    } else {
      console.error('error: ', response.statusCode, response.statusMessage);
    }
  }

  const requestOptions = {
    url: `https://dev.sighthoundapi.com/v1/recognition?objectId=${objectId}`,
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-Access-Token': '9mti9QI2h9ctG1fk5NdDrywkR6GKvAxdf43K'
    },
    method: 'POST',
    body: image
  }
  request(requestOptions,recoCallback);
}
