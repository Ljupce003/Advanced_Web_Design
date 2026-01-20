export function extractPropsAndEvents(v_dom) {
    const {on: events = {}, ...props} = v_dom.props
    delete props.key

    return {props, events}
}