#HTML PROJECT TEMPLATE

######DIRECTORY

```
├── .git/
├─┬ development/  => 開発ディレクトリ
│ ├── common/ => PC / SP common directory
│ │ ├── js/
│ │ └── scss/
│ ├── gulp/ => gulp task directory
│ │ ├── conf/
│ │ └── tasks/
│ ├── pc/ => sp develop directory
│ │ ├── js/
│ │ └── scss/
│ ├── sp/ => sp develop directory
│ │ ├── js/
│ │ └── scss/
│ ├── gulp/ => gulp task directory
│ ├── config.js => 設定ファイル
│ ├── gulpfile.js
│ └── package.json
│
├── production/  => 公開ディレクトリ
├── README.md
├── .editorconfig => エディター用設定ファイル
├── .gitattributes => git設定
└── .gitignore => git管理ファイル設定
```


#### gulp command

SP task add '-sp'

PC: run default task
```
  $ gulp
```

SP: run default task
```
  $ gulp -sp
```

full build
```
  $ gulp all
```


