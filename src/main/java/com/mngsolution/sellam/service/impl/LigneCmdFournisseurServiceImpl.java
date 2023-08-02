package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.LigneCmdFournisseur;
import com.mngsolution.sellam.repository.LigneCmdFournisseurRepository;
import com.mngsolution.sellam.service.LigneCmdFournisseurService;
import com.mngsolution.sellam.service.dto.LigneCmdFournisseurDTO;
import com.mngsolution.sellam.service.mapper.LigneCmdFournisseurMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LigneCmdFournisseur}.
 */
@Service
@Transactional
public class LigneCmdFournisseurServiceImpl implements LigneCmdFournisseurService {

    private final Logger log = LoggerFactory.getLogger(LigneCmdFournisseurServiceImpl.class);

    private final LigneCmdFournisseurRepository ligneCmdFournisseurRepository;

    private final LigneCmdFournisseurMapper ligneCmdFournisseurMapper;

    public LigneCmdFournisseurServiceImpl(
        LigneCmdFournisseurRepository ligneCmdFournisseurRepository,
        LigneCmdFournisseurMapper ligneCmdFournisseurMapper
    ) {
        this.ligneCmdFournisseurRepository = ligneCmdFournisseurRepository;
        this.ligneCmdFournisseurMapper = ligneCmdFournisseurMapper;
    }

    @Override
    public LigneCmdFournisseurDTO save(LigneCmdFournisseurDTO ligneCmdFournisseurDTO) {
        log.debug("Request to save LigneCmdFournisseur : {}", ligneCmdFournisseurDTO);
        LigneCmdFournisseur ligneCmdFournisseur = ligneCmdFournisseurMapper.toEntity(ligneCmdFournisseurDTO);
        ligneCmdFournisseur = ligneCmdFournisseurRepository.save(ligneCmdFournisseur);
        return ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);
    }

    @Override
    public LigneCmdFournisseurDTO update(LigneCmdFournisseurDTO ligneCmdFournisseurDTO) {
        log.debug("Request to update LigneCmdFournisseur : {}", ligneCmdFournisseurDTO);
        LigneCmdFournisseur ligneCmdFournisseur = ligneCmdFournisseurMapper.toEntity(ligneCmdFournisseurDTO);
        ligneCmdFournisseur = ligneCmdFournisseurRepository.save(ligneCmdFournisseur);
        return ligneCmdFournisseurMapper.toDto(ligneCmdFournisseur);
    }

    @Override
    public Optional<LigneCmdFournisseurDTO> partialUpdate(LigneCmdFournisseurDTO ligneCmdFournisseurDTO) {
        log.debug("Request to partially update LigneCmdFournisseur : {}", ligneCmdFournisseurDTO);

        return ligneCmdFournisseurRepository
            .findById(ligneCmdFournisseurDTO.getId())
            .map(existingLigneCmdFournisseur -> {
                ligneCmdFournisseurMapper.partialUpdate(existingLigneCmdFournisseur, ligneCmdFournisseurDTO);

                return existingLigneCmdFournisseur;
            })
            .map(ligneCmdFournisseurRepository::save)
            .map(ligneCmdFournisseurMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LigneCmdFournisseurDTO> findAll() {
        log.debug("Request to get all LigneCmdFournisseurs");
        return ligneCmdFournisseurRepository
            .findAll()
            .stream()
            .map(ligneCmdFournisseurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LigneCmdFournisseurDTO> findOne(Long id) {
        log.debug("Request to get LigneCmdFournisseur : {}", id);
        return ligneCmdFournisseurRepository.findById(id).map(ligneCmdFournisseurMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LigneCmdFournisseur : {}", id);
        ligneCmdFournisseurRepository.deleteById(id);
    }
}
