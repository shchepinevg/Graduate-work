# Generated by Django 3.0.6 on 2020-06-07 16:16

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('optim_app', '0007_auto_20200604_0228'),
    ]

    operations = [
        migrations.CreateModel(
            name='OptimizationInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('optimization_meth', models.CharField(max_length=64)),
                ('N', models.IntegerField()),
                ('parameters', django.contrib.postgres.fields.jsonb.JSONField()),
                ('min_or_max', models.IntegerField()),
                ('value', models.FloatField()),
            ],
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='N',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='is_function',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='optim_type',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='optimization_meth',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='param_func',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='param_optim',
        ),
        migrations.RemoveField(
            model_name='optimizationfunction',
            name='value',
        ),
        migrations.RemoveField(
            model_name='optimizationparameters',
            name='meta_value',
        ),
        migrations.RemoveField(
            model_name='optimizationparameters',
            name='optim_func',
        ),
        migrations.AddField(
            model_name='optimizationparameters',
            name='k',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='optimizationfunction',
            name='optim_info',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='optim_app.OptimizationInfo'),
        ),
        migrations.AddField(
            model_name='optimizationparameters',
            name='optim_info',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='optim_app.OptimizationInfo'),
        ),
    ]
