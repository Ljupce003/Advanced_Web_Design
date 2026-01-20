export function extractPropsAndEvents(v_dom) {
    const {on: events = {}, ...props} = v_dom.props

    return {props, events}
}