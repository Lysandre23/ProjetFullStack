package org.example.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private static List<User> users = new ArrayList<>();

    public List<User> findAll(String name) {
        return users.stream()
                .filter(u -> u.GetName().startsWith(name))
                .toList();
    }
}
