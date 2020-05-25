# Generated by Django 2.2 on 2020-05-19 13:45

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('feedbacks', '0002_feedback_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='profile',
            field=models.ForeignKey(null=True, blank=True, on_delete=django.db.models.deletion.CASCADE, to='profiles.Profile'),
            preserve_default=False,
        ),
    ]
