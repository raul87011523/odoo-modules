<section class="oe_container oe_dark">
    <div class="oe_row">
        <h2 class="oe_slogan">One2Many Sublist</h2>
        <br/>
        <div class="oe_span6">
            <div class="oe_demo oe_screenshot">
                <img src="https://github.com/raul87011523/odoo-modules/blob/master/one2many_sublist/static/description/one2many_list.png">
            </div>
        </div>
        <br/>
        <div class="oe_span6">
            <p>
This widget allows you to create sublists within a tree of a form view. The image shows an example, where the lines appear as a sublist of purchases.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-xs-offset-1">
            <p><strong>Configuration's option</strong></p>
            <p><strong>Mandatory</strong></p>
            <ul>
              <li><code>model</code> - model to list</li>
              <li><code>fk</code> - foreign key of the model to be listed
            </ul>
            <p><strong>Optional</strong></p>
            <ul>
              <li><code>fields</code> - array of fields to display, if the array is empty, all the elements are shown</li>
              <li><code>colspan</code> - associative array, which contains the name of the field to be displayed and its colspan
            </ul>
            <p><strong>Image's example above</strong></p>
            <pre class="literal-block">
    &lt;<strong>field name</strong>="purchase_ids" <strong>widget</strong>="one2many_sublist"&gt;
        <strong>options</strong>="{'model': 'purchase.order.line', 'fk':'order_id',
            'fields': ['name','price_subtotal_iva'], 'colspan': ['name', 5]}"
        &lt;<strong>tree name</strong>="Purchases" <strong>delete</strong>="true"&gt;
            &lt;<strong>field name</strong>="name" <strong>string</strong>="Purchases"/&gt;
            &lt;<strong>field name</strong>="partner_id"/&gt;
            &lt;<strong>field name</strong>="date_order"/&gt;
            &lt;<strong>field name</strong>="picking_type_id"/&gt;
            &lt;<strong>field name</strong>="state"/&gt;
            &lt;<strong>field name</strong>="amount_total" string="Price"/&gt;
            &lt;<strong>/tree</strong>&gt;
    &lt;<strong>/field</strong>&gt;
            </pre>
        </div>
    </div>
</section>


