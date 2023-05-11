declare function require (path: string): any
// eslint-disable-next-line no-redeclare
declare const require: NodeRequire
interface NodeRequire {
  context: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ) => {
    keys: () => string[]
    <T>(id: string): T
  }
}
