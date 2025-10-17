<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/pokemons', name: 'api_pokemons_')]
class PokemonController extends AbstractController
{
    private EntityManagerInterface $em;
    public function __construct(EntityManagerInterface $em) { $this->em = $em; }

    private function toArray(Pokemon $p): array
    {
        return [
            'id' => $p->getId(),
            'name' => $p->getName(),
            'hp' => $p->getHp(),
            'cp' => $p->getCp(),
            'types' => $p->getTypes(),
            'picture' => $p->getPicture(),
            'created' => $p->getCreated() ? $p->getCreated()->format(\DateTime::ATOM) : null,
        ];
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $repos = $this->em->getRepository(Pokemon::class);
        $all = $repos->findAll();
        $data = array_map(fn($p) => $this->toArray($p), $all);
        return $this->json($data, 200);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $p = $this->em->getRepository(Pokemon::class)->find($id);
        if (!$p) return $this->json(null, 404);
        return $this->json($this->toArray($p));
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $p = new Pokemon();
        $p->setName($data['name'] ?? '');
        $p->setHp((int)($data['hp'] ?? 0));
        $p->setCp((int)($data['cp'] ?? 0));
        $p->setTypes($data['types'] ?? []);
        $p->setPicture($data['picture'] ?? null);
        $p->setCreated(new \DateTimeImmutable($data['created'] ?? 'now'));

        $this->em->persist($p);
        $this->em->flush();

        return $this->json($this->toArray($p), 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $p = $this->em->getRepository(Pokemon::class)->find($id);
        if (!$p) return $this->json(null, 404);

        $p->setName($data['name'] ?? $p->getName());
        $p->setHp((int)($data['hp'] ?? $p->getHp()));
        $p->setCp((int)($data['cp'] ?? $p->getCp()));
        $p->setTypes($data['types'] ?? $p->getTypes());
        $p->setPicture($data['picture'] ?? $p->getPicture());

        $this->em->flush();
        return $this->json($this->toArray($p));
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $p = $this->em->getRepository(Pokemon::class)->find($id);
        if (!$p) return $this->json(null, 404);
        $this->em->remove($p);
        $this->em->flush();
        return $this->json([], 204);
    }
}