using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;

namespace RealGadget.Infrastructure
{
    public class SessionEnabledHttpControllerRouteHandler:HttpControllerRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(RequestContext context )
        {

            return new SessionEnabledControllerHandler(context.RouteData);
        }
    }
}