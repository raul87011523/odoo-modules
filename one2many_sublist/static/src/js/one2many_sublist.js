openerp.one2many_sublist = function (instance, local) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    local.FieldOne2ManySubList = instance.web.form.FieldOne2Many.extend({
        load_views: function () {
            var def =this._super();
            var self = this;
            var sublistable = (typeof self.options.model !== 'undefined') && typeof self.options.fk !== 'undefined' || false;
            var fields = self.options.fields || [];
            var views = [];
            _.each(this.views, function (view) {
                _.extend(view.options, {
                    sublistable: sublistable,
                    model: self.options.model,
                    fk: self.options.fk,
                    fields: fields,
                    colspan: self.options.colspan
                });
            });
            return def;
        },
    })

    //instance.web.ListView.prototype.defaults.sublistable = false;
    instance.web.form.AddAnItemList.include({
        pad_table_to: function (count) {
            this._super(count);
            var self = this;
            var options = self.options;
            if (options.sublistable) {
                var model = new instance.web.Model(options.model);
                var fk = options.fk;
                var colspan = options.colspan;
                var fields = options.fields.concat([fk]);
                var ids = this.dataset.ids.filter(function (num) {
                    return !isNaN(num);
                });
                var $current = self.$current;

                this.$current.find('.oe_list_record_delete').click(function(e){
                    e.stopPropagation();
                    var $row = $(e.target).closest('tr');
                    $(self).trigger('deleted', [[self.row_id($row)]]);
                    self.view.ViewManager.views["list"].controller.reload_content();
                });

                var $padding = $current.find('tr').filter("[data-id]");
                var cell_icon = $('<td>').append($('<img>').attr({
                    'src': '/one2many_sublist/static/src/img/icon/expand.gif'
                }).click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $data_id = $(this).parent().parent().attr('data-id');
                    if ($(this).attr('src') == '/one2many_sublist/static/src/img/icon/expand.gif') {
                        $(this).attr({'src': '/one2many_sublist/static/src/img/icon/down-arrow.png'});
                        $current.find('tr.expand-collapse-' + $data_id).show();
                    }
                    else {
                        $(this).attr({'src': '/one2many_sublist/static/src/img/icon/expand.gif'})
                        $current.find('tr.expand-collapse-' + $data_id).hide();
                    }
                }));
                cell_icon.prependTo($padding);

                model.query(fields)
                    .filter([[fk, 'in', ids]])
                    .all().then(function (records) {
                    for (var j = 0; j < records.length; j++) {
                        var $padding = $current.find('tr[data-id="' + records[j][fk][0] + '"]');
                        var $newrow = $('<tr>', {'class': 'expand-collapse-' + records[j][fk][0]});
                        $newrow.append($('<td>'));
                        for (var h = 0; h < fields.length - 1; h++) {
                            var $cell = $('<td>').append(records[j][fields[h]]);
                            if(colspan && fields[h] == colspan[0])
                                $cell.attr({'colspan': colspan[1]})
                            if(!isNaN(records[j][fields[h]]))
                                $cell.attr({'style': 'text-align: right'})
                            $newrow.append($cell);
                        }
                        $newrow.hide();
                        $padding.after($newrow);
                    }
                });
            }
        }
    });

    instance.web.form.widgets.add('one2many_sublist', 'instance.one2many_sublist.FieldOne2ManySubList');
}