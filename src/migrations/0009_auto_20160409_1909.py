# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-09 19:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0008_auto_20160409_1857'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userhistory',
            name='datetime',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='userhistory',
            name='url',
            field=models.URLField(max_length=1000),
        ),
    ]
