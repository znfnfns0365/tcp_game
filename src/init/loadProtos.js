import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';

const __filename = fileURLToPath(import.meta.url); // 현재 모듈의 URL을 fileURLToPath에 넣어서 현재 파일의 절대 경로를 찾음
const __dirname = path.dirname(__filename); // 디렉토리의 절대 경로만 찾아냄(파일 이름을 뺌 ex{home/src/app.js -> home/src/})
const protoDir = path.join(__dirname, '../protobuf'); // 현재 파일 위치 + 2번 나가서 assets 폴더의 절대 경로를 가져옴

const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packageName, types] of Object.entries(packetNames)) {
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packageName][type] = root.lookupType(typeName);
      }
    }

    console.log('Protobuf 파일이 로드되었습니다.');
  } catch (err) {
    console.error('Protobuf file loading error', err);
  }
};

export const getProtoMessages = () => {
  return { ...protoMessages };
};
