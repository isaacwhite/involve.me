# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-09 18:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0007_userhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userhistory',
            name='matches',
            field=models.ManyToManyField(to='src.MatchRel'),
        ),
    ]
