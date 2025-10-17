<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: "App\Repository\PokemonRepository")]
class Pokemon
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 150)]
    private string $name;

    #[ORM\Column(type: "integer")]
    private int $hp = 0;

    #[ORM\Column(type: "integer")]
    private int $cp = 0;

    // store types as JSON array
    #[ORM\Column(type: "json", nullable: true)]
    private array $types = [];

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $picture = null;

    #[ORM\Column(type: "datetime", nullable: true)]
    private ?\DateTimeInterface $created = null;

    // getters / setters...

    public function getId(): ?int { return $this->id; }
    public function getName(): string { return $this->name; }
    public function setName(string $name): self { $this->name = $name; return $this; }

    public function getHp(): int { return $this->hp; }
    public function setHp(int $hp): self { $this->hp = $hp; return $this; }

    public function getCp(): int { return $this->cp; }
    public function setCp(int $cp): self { $this->cp = $cp; return $this; }

    public function getTypes(): array { return $this->types ?? []; }
    public function setTypes(array $types): self { $this->types = $types; return $this; }

    public function getPicture(): ?string { return $this->picture; }
    public function setPicture(?string $picture): self { $this->picture = $picture; return $this; }

    public function getCreated(): ?\DateTimeInterface { return $this->created; }
    public function setCreated(?\DateTimeInterface $created): self { $this->created = $created; return $this; }
}