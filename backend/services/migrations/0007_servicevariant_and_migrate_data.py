from django.db import migrations, models
import django.core.validators


def migrate_to_variants(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    ServiceVariant = apps.get_model('services', 'ServiceVariant')
    
    # Create ServiceVariant records for existing services
    for service in Service.objects.all():
        if hasattr(service, 'price') and hasattr(service, 'duration_minutes') and hasattr(service, 'barber_level'):
            # Create variant for this service
            ServiceVariant.objects.create(
                service=service,
                barber_level=service.barber_level,
                price=service.price,
                duration_minutes=service.duration_minutes
            )


def reverse_migrate_to_variants(apps, schema_editor):
    # Remove all ServiceVariant records
    ServiceVariant = apps.get_model('services', 'ServiceVariant')
    ServiceVariant.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0006_alter_category_options_remove_service_duration_range_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barber_level', models.CharField(choices=[('ranger', 'Ranger'), ('skipper', 'Skipper'), ('captain', 'Captain')], max_length=20)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('duration_minutes', models.PositiveIntegerField()),
                ('service', models.ForeignKey(on_delete=models.CASCADE, related_name='variants', to='services.service')),
            ],
            options={
                'unique_together': {('service', 'barber_level')},
                'verbose_name': 'Вариант услуги',
                'verbose_name_plural': 'Варианты услуг',
            },
        ),
        migrations.RunPython(migrate_to_variants, reverse_migrate_to_variants),
        # Remove the old fields from Service model
        migrations.RemoveField(
            model_name='service',
            name='price',
        ),
        migrations.RemoveField(
            model_name='service',
            name='duration_minutes',
        ),
        migrations.RemoveField(
            model_name='service',
            name='barber_level',
        ),
    ]