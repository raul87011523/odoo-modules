# -*- coding: utf-8 -*-
{
    'name': "One2Many Sublist",
    'version': "1.0",
    'author': "Raul Rodriguez",
    'license': "AGPL-3",
    "summary": "MDisplay sublist inside of tree view",
    'depends': ['base'
    ],
    'qweb': ['static/src/xml/*.xml'],
    'data': [
        'views/one2many_sublist_view.xml',
    ],

    'installable': True,
}
