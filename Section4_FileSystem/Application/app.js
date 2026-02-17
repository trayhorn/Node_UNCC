const fs = require('fs/promises');

(async () => {
  const createFile = async (path) => {
    try {
      const existingHandle = await fs.open(path, "r");
      existingHandle.close();
      return console.log(`The file ${path} already exists`);
    } catch (e) {
      const newFileHandle = await fs.open(path, 'w');
      console.log("A new file was sucessfully created");
      newFileHandle.close();
    }
  }

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log("The file has been removed");
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("No file under the path");
      } else {
        console.log("An error occured while removing the file: ", e);
      }
    }
  }

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log("The file has been renamed");
    } catch (error) {
      if (e.code === "ENOENT") {
        console.log("No file under the path");
      } else {
        console.log("An error occured while renaming the file: ", e);
      }
    }
  }

  let addedContent;

  const addToFile = async (path, content) => {
    if(addedContent === content) return;
  
    try {
      const targetFileHanler = await fs.open(path, 'a');
      targetFileHanler.write(content);
      addedContent = content;
      targetFileHanler.close();
      console.log("Contect has been added to a file");
    } catch (e) {
      console.log("An error occured when adding content: ", e);
    }
  }

  // commands

  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename a file';
  const ADD_TO_FILE = 'add to a file';

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on('change', async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString('utf-8');

    // create a file: "create a file PATH"

    if(command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file: "delete a file PATH"

    if(command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file: PATH to NEW_PATH

    if(command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
    }

    // add to a file PATH content

    if(command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf('content ');
      const path = command.substring(ADD_TO_FILE.length + 1, _idx - 1);
      const newContent = command.substring(_idx + 8);

      addToFile(path, newContent);
      // console.log({path, newContent});
    }
  })

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if(event.eventType === 'change') commandFileHandler.emit('change');
  }
})()