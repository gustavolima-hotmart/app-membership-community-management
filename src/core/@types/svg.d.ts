declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const content: string
  export { ReactComponent }
  export default content
}
