import { saveAs } from 'file-saver';

interface File {
  name: string;
  content: string;
}

interface Directory {
  name: string;
  files: File[];
  directories: Directory[];
}

export class TerminalOfFiles {
  private root: Directory;
  private currentDirectory: Directory;

  constructor() {
      this.root = { name: '/', files: [], directories: [] };
      this.currentDirectory = this.root;
  }

  public pwd(): string {
      return this.getPath(this.currentDirectory);
  }

  public ls(): string {
      const files = this.currentDirectory.files.map((file: File) => file.name);
      const directories = this.currentDirectory.directories.map((dir: Directory) => dir.name);
      return [...files, ...directories].join(' ');
  }

  public mkdir(name: string): void {
      if (this.findDirectory(name, this.currentDirectory) || this.findFile(name, this.currentDirectory)) {
          throw new Error(`Directory or file with name ${name} already exists`);
      }
      this.currentDirectory.directories.push({ name, files: [], directories: [] });
  }

  public touch(name: string): void {
      if (this.findDirectory(name, this.currentDirectory) || this.findFile(name, this.currentDirectory)) {
          throw new Error(`Directory or file with name ${name} already exists`);
      }
      this.currentDirectory.files.push({ name, content: '' });
  }

  public export(fileName: string): void {
      const file = this.findFile(fileName, this.currentDirectory);
      if (!file) {
          throw new Error(`File ${fileName} not found`);
      }
      const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, fileName);
  }

  public import(fileName: string): Promise<void> {
      return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = (e: Event) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                      const content = e.target?.result as string;
                      const existingFile = this.findFile(fileName, this.currentDirectory);
                      if (existingFile) {
                          existingFile.content = content;
                      } else {
                          this.currentDirectory.files.push({ name: fileName, content });
                      }
                      resolve();
                  };
                  reader.onerror = (e) => {
                      reject(new Error('Failed to read file'));
                  };
                  reader.readAsText(file);
              } else {
                  reject(new Error('No file selected'));
              }
          };
          input.click();
      });
  }

  public cd(path: string): void {
      if (path === '..') {
          const parent = this.findParentDirectory(this.currentDirectory);
          if (parent) {
              this.currentDirectory = parent;
          } else {
              throw new Error("Already at the root directory");
          }
      } else {
          const directory = this.findDirectory(path, this.currentDirectory);
          if (directory) {
              this.currentDirectory = directory;
          } else {
              throw new Error(`Directory ${path} not found`);
          }
      }
  }

  public saveToLocalStorage(): void {
      const json = JSON.stringify(this.root);
      localStorage.setItem('fileSystem', json);
  }

  public loadFromLocalStorage(): void {
      const json = localStorage.getItem('fileSystem');
      if (json) {
          this.root = JSON.parse(json);
          this.currentDirectory = this.root;
      }
  }

  private findDirectory(name: string, directory: Directory): Directory | undefined {
      return directory.directories.find((dir: Directory) => dir.name === name);
  }

  private findFile(name: string, directory: Directory): File | undefined {
      return directory.files.find((file: File) => file.name === name);
  }

  private getPath(directory: Directory): string {
      if (directory === this.root) {
          return '/';
      }
      const parentPath = this.getPath(this.findParentDirectory(directory) as Directory);
      return `${parentPath}${directory.name}/`;
  }

  private findParentDirectory(directory: Directory): Directory | undefined {
      const findInDirectory = (dir: Directory): Directory | undefined => {
          for (const subDir of dir.directories) {
              if (subDir === directory) {
                  return dir;
              }
              const found = findInDirectory(subDir);
              if (found) {
                  return found;
              }
          }
          return undefined;
      };
      return findInDirectory(this.root);
  }
}

export {};