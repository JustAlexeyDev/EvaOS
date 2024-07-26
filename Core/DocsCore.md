Core version - 1.001.00

# Добавлено:

- mkdir - позволяет создавать директорию (post){title, path} 
- ls - позволяет смотреть содержимое директории (post){path}
- tree - позволяет посмотреть абсолютно все директории и файлы начиная с основной директории (post){path}
- remove - позволяет удалить директорию или файл (post){title, path}
- import - позволяет загрузить файл (post){file, path}
- export - позволяет скачать файл (post){path}
- touch - позволяет саздать и изменять файл (post){title, path desc}
- cat - позволяет посмотреть содержимое файла (post){title, path}
- versionCoreDir - позволяет посмотреть версию директорий (get)

# Как это использовать:

## mkdir

```
http://localhost:8000/mkdir 
-----------------------------
Post:
    Form-Data:
        title: root
        path: /
result:
    MainFolders/root
```

## ls

```
http://localhost:8000/ls 
-----------------------------
Post:
    Form-Data:
        path: /
result:
    root
```

## touch

```
http://localhost:8000/touch 
-----------------------------
Post:
    Form-Data:
        title: exampleFile.txt
        path: /
        desc: Hello World!
result:
    Create File with title "exampleFile.txt" and description "Hello World!"

Or

Post:
    Form-Data:
        title: exampleFile.txt
        path: /
        desc: Hello World! Hi!
result:
    Update File "exampleFile.txt", description "Hello World!" -> "Hello World! Hi!"
```

## cat

```
http://localhost:8000/cat 
-----------------------------
Post:
    Form-Data:
        title: exampleFile.txt
        path: /
result:
    view text on file exampleFile.txt "Hello World! Hi!"
```

## tree

```
http://localhost:8000/tree 
-----------------------------
Post:
    Form-Data:
        path: /
result:
    | --> /root
    \ --> exampleFile.txt
```

## remove

```
http://localhost:8000/remove 
-----------------------------
Post:
    Form-Data:
        title: exampleFile.txt
        path: /
result:
    remove file exampleFile.txt
```

## import

```
http://localhost:8000/import 
-----------------------------
Post:
    Form-Data:
        file: exampleFile.png
        path: /
result:
    import file in directive "/"
```

## export

```
http://localhost:8000/import 
-----------------------------
Post:
    Form-Data:
        path: /exampleFile.png
result:
    export file from directive "/"
```