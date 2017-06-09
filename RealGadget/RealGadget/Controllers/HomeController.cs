using RealGadget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RealGadget.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult ViewOrder(int id)
        {
            using (var context = new RealGadgetContext())
            {
                var order = context.Orders.Find(id);

                var gadgetOrders = context.GadgetOrders.Where(go => go.OrderID == id);

                foreach (GadgetOrder gadgetOrder in gadgetOrders)
                {
                    context.Entry(gadgetOrder).Reference(go => go.Gadget).Load();
                    order.Gadgets.Add(gadgetOrder.Gadget);
                }

                return View(order);
            }
        }

    }
}
