const { User, Order, TableDetails, Product, Side, sequelize } =
  sequelize.models;

// 🧮 FUNCIÓN 1: CERRAR Y COBRAR LA CUENTA (Para pagos normales o invitaciones en S/ 0.00)
const cerrarYCalcularCuenta = async (req, res) => {
  const { orderId } = req.params;
  const { ticketsApplied, manualAdjustment, adjustmentReason } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const orden = await Order.findByPk(orderId, {
      include: [
        {
          model: TableDetails,
          include: [{ model: Product }, { model: Side }],
        },
      ],
      transaction,
    });

    if (!orden) {
      return res.status(404).json({ message: "La orden no existe." });
    }

    // 🔒 Candado: Si ya se cobró o se anuló, no se toca
    if (orden.status === "pagado" || orden.status === "anulado") {
      return res.status(400).json({
        message: `Esta orden ya está en estado [${orden.status}] y no se puede modificar.`,
      });
    }

    let sumaSubtotales = 0;

    // Calcular platos y extras de acompañamientos
    orden.tableDetails.forEach((detalle) => {
      const producto = detalle.product;
      const cantidadPlatos = detalle.quantity;
      const acompañamientosElegidos = detalle.sides.length;

      const limiteGratisTotal = producto.freeSidesLimit * cantidadPlatos;
      let costoExtrasLinea = 0;

      if (acompañamientosElegidos > limiteGratisTotal) {
        const extras = acompañamientosElegidos - limiteGratisTotal;
        costoExtrasLinea = extras * parseFloat(producto.extraSidePrice);
      }

      const subtotalFinalLinea =
        parseFloat(producto.basePrice) * cantidadPlatos + costoExtrasLinea;
      sumaSubtotales += subtotalFinalLinea;
    });

    const descuentoTickets = parseInt(ticketsApplied || 0) * 5.0;

    // Aquí se aplica la matemática (si es invitación, manualAdjustment vendrá como -Total)
    let totalFinal =
      sumaSubtotales - descuentoTickets + parseFloat(manualAdjustment || 0);

    if (totalFinal < 0) totalFinal = 0; // Protegemos que nunca dé negativo

    // Guardamos en la base de datos y pasamos a 'pagado'
    await orden.update(
      {
        ticketsApplied: ticketsApplied || 0,
        manualAdjustment: manualAdjustment || 0,
        adjustmentReason: adjustmentReason || null,
        totalPrice: totalFinal,
        status: "pagado", // 🟩 Pasa a pagado (la mesa iniciará su proceso de liberación)
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(200).json({
      message: "Cuenta procesada con éxito. 🧾✨",
      data: {
        orderId: orden.id,
        subtotal: sumaSubtotales,
        totalCobrado: totalFinal,
      },
    });
  } catch (error) {
    await transaction.rollback();
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res
      .status(500)
      .json({ message: "Error al procesar la cuenta.", error: error.message });
  }
};

// 🛑 FUNCIÓN 2: ANULAR ORDEN (Para errores de mesa o clientes que se van sin pagar)
const anularOrden = async (req, res) => {
  const { orderId } = req.params;
  const { adjustmentReason } = req.body; // El motivo de la anulación ahora es obligatorio

  try {
    const orden = await Order.findByPk(orderId);

    if (!orden) {
      return res.status(404).json({ message: "La orden no existe." });
    }

    if (orden.status === "pagado") {
      return res
        .status(400)
        .json({ message: "No se puede anular una orden que ya fue pagada." });
    }

    if (!adjustmentReason || adjustmentReason.trim() === "") {
      return res.status(400).json({
        message:
          "Debe proporcionar un motivo justificado para anular la orden.",
      });
    }

    // Actualizamos la orden: el precio se va a cero y queda registrado el porqué
    await orden.update({
      status: "anulado",
      totalPrice: 0.0,
      manualAdjustment: 0.0,
      adjustmentReason: `ANULADO: ${adjustmentReason}`,
    });

    return res.status(200).json({
      message:
        "La orden ha sido anulada correctamente. Registro guardado para auditoría. 🧼",
      orderId: orden.id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al anular la orden.", error: error.message });
  }
};

module.exports = { cerrarYCalcularCuenta, anularOrden };
