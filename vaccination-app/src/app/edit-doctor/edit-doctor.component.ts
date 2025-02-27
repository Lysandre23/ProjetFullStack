import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-doctor',
  imports: [FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doctor = {
    id: 0,
    name: '',
    email: '',
    specialty: ''
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Exemple pour récupérer l'ID du médecin depuis les paramètres d'URL
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      // Remplacez par un appel API pour charger les informations du médecin
      this.doctor = {
        id: parseInt(doctorId, 10),
        name: 'Dr. Exemple',
        email: 'exemple@example.com',
        specialty: 'Cardiologie'
      };
    }
  }

  onSubmit(): void {
    // Sauvegarder les modifications du médecin (appel API par exemple)
    alert(`Médecin ${this.doctor.name} mis à jour avec succès !`);
    this.router.navigate(['/manage-doctors']); // Redirection après sauvegarde
  }

  onCancel(): void {
    this.router.navigate(['/manage-doctors']); // Redirection en cas d'annulation
  }
}
