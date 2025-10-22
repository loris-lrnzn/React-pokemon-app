<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

#[Route('/user', name: 'app_user')]
final class UserController extends AbstractController
{
    

    private EntityManagerInterface $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function toArray(User $p): array
    {
        return [
            'id' => $p->getId(),
            'email' => $p->getEmail(),
            'password' => $p->getPassword(),
        ];
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $repos = $this->em->getRepository(User::class);
        $all = $repos->findAll();
        $data = array_map(fn($p) => $this->toArray($p), $all);
        return $this->json($data, 200);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        // Le traitement de l'authentification est géré par le firewall de Symfony.
        return $this->json(['message' => 'Login endpoint. Authentication is handled by the firewall.'], 200);
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        // Le traitement de la déconnexion est géré par le firewall de Symfony.
        return $this->json(['message' => 'Logout endpoint. Logout is handled by the firewall.'], 200);
    }
}