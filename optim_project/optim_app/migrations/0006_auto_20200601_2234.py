# Generated by Django 3.0.6 on 2020-06-01 15:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('optim_app', '0005_auto_20200601_2227'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parameterinfo',
            old_name='type',
            new_name='discrete_continuous',
        ),
    ]
