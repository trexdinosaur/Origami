import * as mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0/demo');
let db = mongoose.connection;
let Schema = mongoose.Schema;
export let model = mongoose.model;

export const baseInputComponentSchema = new Schema({
  id: Number
});

export const inputComponentSchema = new Schema({
  id: Number,
  baseComponentId: Number,
  token: String,
  props: String
});

export const outputComponentSchema = new Schema({
  id: Number,
  baseComponentId: Number,
  token: String,
  props: String
});

export const githubDemoSchema = new Schema({
  name:  String,
  id: Number,
  description: String,
  timestamp:   Number,
  dockerContainerId: String,
  inputComponentId: String,
  outputComponentId: String
});