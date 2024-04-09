export interface EntityMapper<Entity, Dto> {
  toDto(entity: Entity): Dto;
}
