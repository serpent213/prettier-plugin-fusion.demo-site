import Plausible from "plausible-tracker"

const { trackPageview, enableAutoOutboundTracking } = Plausible({
  domain: "zensurradar.de",
  apiHost: ""
})

trackPageview()
enableAutoOutboundTracking()
