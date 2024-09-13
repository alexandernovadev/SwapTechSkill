import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { User } from '../entity/User';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  // Método para buscar un usuario por correo electrónico y cargar los roles
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('user.email = :email', { email })
      .getOne();
  }

  // Método para buscar usuarios por rol
  async findByRole(roleName: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.userRoles', 'userRole')
      .innerJoinAndSelect('userRole.role', 'role')
      .where('role.roleName = :roleName', { roleName })
      .getMany();
  }

  // Método para guardar un usuario (Crear o Actualizar)
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Método para buscar un usuario por ID (Leer)
  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByIdWithRoles(id: number): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('user.id = :id', { id })
      .getOne();
  }

  // Método para buscar un usuario por ID con todos los datos add rating, languages and skills
  async findByIdAllData(id: number): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole') // Unir roles
      .leftJoinAndSelect('userRole.role', 'role') // Unir los detalles del rol
      .leftJoinAndSelect('user.userLanguages', 'userLanguage') // Unir lenguajes
      .leftJoinAndSelect('userLanguage.language', 'language') // Unir detalles del lenguaje
      .leftJoinAndSelect('user.userSkills', 'userSkill') // Unir habilidades
      .leftJoinAndSelect('userSkill.skill', 'skill') // Unir detalles de las habilidades
      .leftJoinAndSelect(
        'user.userProfessionalStudies',
        'userProfessionalStudy',
      ) // Unir estudios profesionales
      .where('user.id = :id', { id })
      .getOne();
  }

  // Método para búsqueda avanzada por nombre de usuario, rol, habilidad y lenguaje
  async searchAdvanced(filters: {
    userName?: string;
    roleName?: string;
    skillName?: string;
    languageName?: string;
  }): Promise<User[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('user.userSkills', 'userSkill')
      .leftJoinAndSelect('userSkill.skill', 'skill')
      .leftJoinAndSelect('user.userLanguages', 'userLanguage')
      .leftJoinAndSelect('userLanguage.language', 'language');

    // Función para manejar múltiples palabras y aplicar LIKE con OR para cada palabra en varias columnas
    const applyMultiWordSearch = (columns: string[], searchValues: string) => {
      const values = searchValues
        .split('"') // Separa los valores entre comillas
        .filter((value) => value.trim().length > 0); // Filtra entradas vacías

      values.forEach((value, index) => {
        const words = value.trim().toLowerCase().split(' ');
        const conditions = words
          .map((word) =>
            columns
              .map((column) => `LOWER(${column}) LIKE :word${index}`)
              .join(' OR '),
          )
          .join(' OR ');

        words.forEach((word) => {
          query.orWhere(conditions, { [`word${index}`]: `%${word}%` });
        });
      });
    };

    if (filters.userName) {
      // Búsqueda en firstName y lastName
      applyMultiWordSearch(
        ['user.firstName', 'user.lastName'],
        filters.userName,
      );
    }

    if (filters.roleName) {
      // Búsqueda en roleName, permitiendo múltiples roles entre comillas
      applyMultiWordSearch(['role.roleName'], filters.roleName);
    }

    if (filters.skillName) {
      // Búsqueda en skillName, permitiendo múltiples habilidades entre comillas
      applyMultiWordSearch(['skill.skillName'], filters.skillName);
    }

    if (filters.languageName) {
      // Búsqueda en languageName, permitiendo múltiples lenguajes entre comillas
      applyMultiWordSearch(['language.languageName'], filters.languageName);
    }

    return await query.getMany();
  }

  // Método para actualizar un usuario
  async update(
    id: number,
    updatedUser: Partial<User>,
  ): Promise<User | undefined> {
    await this.userRepository.update(id, updatedUser);
    return this.findById(id);
  }

  // Método para eliminar un usuario
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
